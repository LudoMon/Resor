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
                    "title" => "Camping des flots bleus",
                    "description" => $lorem,
                    "price" => "34",
                    "features" => array("pool", "animals", "spa", "jacuzzi")
                ),
                array(
                    "title" => "Camping de l'océan",
                    "description" => $lorem,
                    "price" => "27",
                    "features" => array("spa", "jacuzzi")
                ),
                array(
                    "title" => "Camping de la plage",
                    "description" => $lorem,
                    "price" => "39",
                    "features" => array("pool", "spa", "jacuzzi")
                ),
                array(
                    "title" => "Camping du soleil",
                    "description" => $lorem,
                    "price" => "42",
                    "features" => array("pool", "animals")
                ),
                array(
                    "title" => "Camping Serge",
                    "description" => $lorem,
                    "price" => "19",
                    "features" => array("spa", "jacuzzi")
                )
            )
        );
        return new JsonResponse($results);
    }

}
