<?php

namespace Resor\Bundle\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class AdminController extends Controller
{
    /**
     * @Route("/campings")
     * @Template()
     */
    public function listCampingsAction()
    {
        $repository = $this->getDoctrine()
            ->getManager()
            ->getRepository('ResorCoreBundle:Camping');
        $campings = $repository->findAll();

        return [
            'campings' => $campings
        ];
    }

}
