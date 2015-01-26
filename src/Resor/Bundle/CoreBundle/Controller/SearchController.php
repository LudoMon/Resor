<?php

namespace Resor\Bundle\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class SearchController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }

    /**
     * @Route("/results", name="results")
     * @Template()
     */
    public function resultsAction(Request $request)
    {
        $place = $request->query->get('place');
        $lat = $request->query->get('lat');
        $lng = $request->query->get('lng');
        return array(
            "place" => $place,
            "lat" => $lat,
            "lng" => $lng
        );
    }

}
