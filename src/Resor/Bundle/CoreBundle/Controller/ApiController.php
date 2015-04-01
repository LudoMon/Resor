<?php

namespace Resor\Bundle\CoreBundle\Controller;


use Resor\Bundle\CoreBundle\Entity\Availability;
use Resor\Bundle\CoreBundle\Entity\Booking;
use Resor\Bundle\CoreBundle\Entity\Camping;
use Resor\Bundle\CoreBundle\Entity\Offer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;

use FOS\RestBundle\Controller\Annotations\View;

class ApiController extends Controller {
    /**
     * @param int $campingId
     * @return array
     * @View()
     */
    public function getBookingsAction($campingId)
    {
        $em = $this->getDoctrine()->getManager();

        /**
         * @var Camping
         */
        $camping = $em->getRepository('ResorCoreBundle:Camping')
            ->find($campingId);

        $offers = $em->getRepository('ResorCoreBundle:Offer')
            ->findByCamping($camping);

        $bookings = $em->getRepository('ResorCoreBundle:Booking')
            ->findByOffer($offers);

        return ['bookings' => $bookings];
    }

    /**
     * @param $bookingId
     * @return array
     * @View()
     */
    public function deleteBookingAction($bookingId)
    {
        $em = $this->getDoctrine()->getManager();

        $booking = $em->getRepository('ResorCoreBundle:Booking')
            ->find($bookingId);
        $em->remove($booking);
        $em->flush();
        return [
            'message' => 'Booking deleted'
        ];
    }

    /**
     * @param $campingId
     * @param Request $request
     * @return array
     * @View()
     */
    public function postBookingAction($campingId, Request $request)
    {
        /*
         * Wanted booking : offerId, startDate, endDate
         */
        $wantedBooking = $request->get('booking');

        $em = $this->getDoctrine()->getManager();
        $camping = $em->getRepository('ResorCoreBundle:Camping')
            ->find($campingId);
        $offer = $em->getRepository('ResorCoreBundle:Offer')
            ->findOneBy([
                'campingId' => $wantedBooking['offerId'],
                'camping' => $camping
        ]);
        $canBook = $em->getRepository('ResorCoreBundle:Booking')
            ->canBook($offer, $wantedBooking);

        if ($canBook) {
            $booking = new Booking();
            $booking->setStartDate($wantedBooking['startDate'])
                ->setEndDate($wantedBooking['endDate'])
                ->setOffer($offer)
                ->setUser($camping->getOwner());
            $em->persist($booking);
            $em->flush();
            $response = [
                'message' => 'Booking added',
                'id' => $booking->getId()
            ];
        } else {
            $response = [
                'message' => 'Booking not available',
                'id' => 0
            ];
        }

        return ['response' => $response];
    }

    /**
     * @param $campingId
     * @param Request $request
     * @return array
     * @View()
     */
    public function postOffersAction($campingId, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $messages = [];

        $camping = $em->getRepository('ResorCoreBundle:Camping')
            ->find($campingId);
        $currentOffers = $em->getRepository('ResorCoreBundle:Offer')
            ->findByCamping($camping);
        $currentOffersIds = $this->getOffersIds($currentOffers);

        $newOffers = json_decode($request->get('offers'));
        foreach ($newOffers as $newOffer) {
            $keyInIds = array_search($newOffer['id'], $currentOffersIds);
            if (false !== $keyInIds) {
                // TODO Update offer, comparing availabilities
                $messages[] = 'Offer ' . $newOffer['id'] . ' already exists';
                unset($currentOffersIds[$keyInIds]);
            } else {
                $offer = new Offer();
                $offer->setCampingId($newOffer['id'])
                    ->setCreatedAt($newOffer['created_at'])
                    ->setUpdatedAt($newOffer['updated_at'])
                    ->setName($newOffer['name'])
                    ->setOptions($newOffer['options'])
                    ->setImages($newOffer['images'])
                    ->setCamping($camping);
                $em->persist($offer);

                foreach ($newOffer['plage'] as $plage) {
                    $availability = new Availability();
                    $availability->setStartDate($plage['debut'])
                        ->setEndDate($plage['fin'])
                        ->setIsOpen($plage['ouvert'])
                        ->setPrice(isset($plage['prix']) ? $plage['prix'] : 0)
                        ->setPlacesNumber($plage['nbEmplacements'])
                        ->setOffer($offer);
                    $em->persist($availability);
                }
            }
        }

        $bookingRepository = $em->getRepository('ResorCoreBundle:Booking');
        $today = new DateTime();
        foreach ($currentOffersIds as $key => $offerToDeleteId) {
            $bookings = $bookingRepository->findByOffer($currentOffers[$key]);
            $canDeleteOffer = true;
            foreach ($bookings as $booking) {
                if ($booking->getEndDate() >= $today) {
                    $canDeleteOffer = false;
                    break;
                }
            }

            if ($canDeleteOffer) {
                $em->remove($currentOffers[$key]);
            } else {
                $messages[] = 'Could not delete offer ' . $offerToDeleteId;
            }
        }

        $em->flush();

        if (empty($messages)) {
            $messages[] = 'Data successfuly updated';
        }
        return ['messages', $messages];
    }

    private function getOffersIds($currentOffers)
    {
        $ids = [];
        foreach ($currentOffers as $key => $offer) {
            $ids[$key] = $offer->getCampingId();
        }
        return $ids;
    }
}