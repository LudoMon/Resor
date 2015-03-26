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
        $campings = array(
            array(
                "id" => 0,
                "title" => "Camping des flots bleus",
                "price" => "34",
                "features" => array("pool", "animals", "spa", "jacuzzi"),
                "lat" => 48.85934,
                "lng" => 2.31617
            ),
            array(
                "id" => 1,
                "title" => "Camping de l'océan",
                "price" => "27",
                "features" => array("spa", "jacuzzi"),
                "lat" => 48.84534,
                "lng" => 2.33368
            ),
            array(
                "id" => 2,
                "title" => "Camping de la plage",
                "price" => "39",
                "features" => array("pool", "spa", "jacuzzi"),
                "lat" => 48.83811,
                "lng" => 2.37522
            ),
            array(
                "id" => 3,
                "title" => "Camping du soleil",
                "price" => "42",
                "features" => array("pool", "animals"),
                "lat" => 48.86431,
                "lng" => 2.37248
            ),
            array(
                "id" => 4,
                "title" => "Camping Serge",
                "price" => "19",
                "features" => array("spa", "jacuzzi"),
                "lat" => 48.89050,
                "lng" => 2.33471
            )
        );
        $camping = $campings[$id];
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
