<?php

namespace Resor\Bundle\CoreBundle\Controller;


use Resor\Bundle\CoreBundle\Entity\Camping;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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

        $camping = $em->getRepository('ResorCoreBundle:Camping')
            ->find($campingId);

        $places = $em->getRepository('ResorCoreBundle:Place')
            ->findByCamping($camping);

        $bookings = $em->getRepository('ResorCoreBundle:Booking')
            ->findByPlace($places);

        return ['bookings' => $bookings];
    }
}