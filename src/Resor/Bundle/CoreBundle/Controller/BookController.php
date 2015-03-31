<?php

namespace Resor\Bundle\CoreBundle\Controller;

use Resor\Bundle\CoreBundle\Entity\Booking;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class BookController extends Controller
{
    /**
     * @Route("/book/{id}", name="book")
     * @Template()
     */
    public function bookCampingAction($id, Request $request)
    {
        $camping = $this->getDoctrine()
            ->getRepository('ResorCoreBundle:Camping')
            ->find($id);

        $offers = $this->getDoctrine()
            ->getRepository('ResorCoreBundle:Offer')
            ->findForCampingId($id);

        $from = $request->query->get('from');
        $to = $request->query->get('to');
        return array(
            "camping" => $camping,
            "offers" => $offers,
            "from" => $from,
            "to" => $to,
            "bookingId" => $id
        );
    }

    /**
     * @Route("/book/{camping_id}/finalize/{av_id}", name="finalize")
     * @Template()
     */
    public function finalizeAction($camping_id, $av_id, Request $request)
    {
        $from = $request->request->get('from');
        $to = $request->request->get('to');

        $em = $this->getDoctrine()->getManager();

        $availability = $em->getRepository('ResorCoreBundle:Availability')
            ->find($av_id);

        if (!$availability->getIsOpen()) {
            return $this->redirect($this->generateUrl('fos_user_profile_show'));
        }

        $booking = new Booking();
        $booking->setStartDate(date_create($from));
        $booking->setEndDate(date_create($to));
        $booking->setUser($this->get('security.context')->getToken()->getUser());
        $booking->setAvailability($availability);

        $em->persist($booking);

        $availability->setIsOpen(false);

        $em->flush();


        return array(
            "booking" => $booking
        );
    }

}
