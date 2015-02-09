<?php

namespace Resor\Bundle\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

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

    /**
     * @Route("/api/results", name="resultsApi")
     * @Template()
     */
    public function resultsGetAction()
    {

        $lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in dignissim ex. Ut efficitur libero sed ipsum laoreet, a laoreet nunc consequat. Vestibulum mollis quis dui non commodo. Donec nec neque id nulla volutpat maximus. Nulla facilisi. Nullam ultricies lacinia diam, nec consectetur massa congue ac. Phasellus scelerisque at enim sed rhoncus. Ut ut ex leo. Nunc eu libero leo. Phasellus placerat luctus interdum. Duis efficitur laoreet dolor, malesuada rutrum neque congue sit amet. Aliquam semper arcu sapien. ";

        $results = array(
            "results" => array(
                array(
                    "id" => 0,
                    "title" => "Camping des flots bleus",
                    "description" => $lorem,
                    "price" => "34",
                    "features" => array("pool", "animals", "spa", "jacuzzi"),
                    "lat" => 48.85934,
                    "lng" => 2.31617
                ),
                array(
                    "id" => 1,
                    "title" => "Camping de l'océan",
                    "description" => $lorem,
                    "price" => "27",
                    "features" => array("spa", "jacuzzi"),
                    "lat" => 48.84534,
                    "lng" => 2.33368
                ),
                array(
                    "id" => 2,
                    "title" => "Camping de la plage",
                    "description" => $lorem,
                    "price" => "39",
                    "features" => array("pool", "spa", "jacuzzi"),
                    "lat" => 48.83811,
                    "lng" => 2.37522
                ),
                array(
                    "id" => 3,
                    "title" => "Camping du soleil",
                    "description" => $lorem,
                    "price" => "42",
                    "features" => array("pool", "animals"),
                    "lat" => 48.86431,
                    "lng" => 2.37248
                ),
                array(
                    "id" => 4,
                    "title" => "Camping Serge",
                    "description" => $lorem,
                    "price" => "19",
                    "features" => array("spa", "jacuzzi"),
                    "lat" => 48.89050,
                    "lng" => 2.33471
                )
            ),
            "filters" => array("pool", "animals", "spa", "jacuzzi")
        );
        return new JsonResponse($results);
    }

}
