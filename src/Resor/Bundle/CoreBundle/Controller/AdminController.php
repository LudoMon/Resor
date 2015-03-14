<?php

namespace Resor\Bundle\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AdminController extends Controller
{
    /**
     * @Route("/campings")
     * @Template()
     */
    public function listCampingsAction(Request $request)
    {
        $repository = $this->getDoctrine()
            ->getManager()
            ->getRepository('ResorCoreBundle:Camping');

        if ('POST' == $request->getMethod()) {
            $campings = $repository->findLikeName($request->get('camping-name'));
        } else {
            $campings = $repository->findAll();
        }

        return [
            'campings' => $campings
        ];
    }

    /**
     * @Route("/camping/{id}/{action}", requirements={"id" = "\d+", "action" = "activer|desactiver"})
     */
    public function enableCampingAction(Request $request, $id, $action)
    {
        $response = new JsonResponse();
        if (!$request->isXmlHttpRequest()) {
            return $response;
        }

        $camping = $this->getDoctrine()
            ->getRepository('ResorCoreBundle:Camping')
            ->find($id);
        $camping->setIsActive('activer' == $action);

        $em = $this->getDoctrine()->getManager();
        $em->persist($camping);
        $em->flush();

        $response->setData([
            'status' => 'success'
        ]);
        return $response;
    }

}
