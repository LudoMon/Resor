<?php

namespace Resor\Bundle\CoreBundle\Controller;

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
     * @Route("/book/{id}/finalize", name="finalize")
     * @Template()
     */
    public function finalizeAction()
    {
        return array();
    }

}
