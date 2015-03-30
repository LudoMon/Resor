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

        $from = $request->query->get('from');
        $to = $request->query->get('to');
        return array(
            "camping" => $camping,
            "from" => $from,
            "to" => $to,
            "bookingId" => $id
        );
    }
}
