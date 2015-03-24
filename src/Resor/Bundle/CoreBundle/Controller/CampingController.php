<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Resor\Bundle\CoreBundle\Controller;

/**
 * Description of CampingController
 *
 * @author Thibault
 */
use Resor\Bundle\CoreBundle\Entity\Camping;
use Resor\Bundle\CoreBundle\Form\CampingType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class CampingController extends Controller
{
    /**
     * @param Request $request
     * @return array
     *
     * @Route("/camping/add", name="camping_add")
     * @Template()
     */
    public function addCampingAction(Request $request)
    {
        $camping = new Camping();
        $form = $this->createForm('camping', $camping);

        if ('POST' == $request->getMethod()) {
            $form->handleRequest($request);
            $isValid = $form->isValid();

            if ($isValid){
                $token = $this->get( 'security.context' )->getToken();
                $currentUser = $token->getUser();
                $currentUser->setFirstName($camping->getOwner()->getFirstName());
                $currentUser->setLastName($camping->getOwner()->getLastName());
                $currentUser->addRole('ROLE_CAMPING');
                $camping->setOwner($currentUser);

                $em = $this->get('doctrine.orm.entity_manager');
                $em->persist($camping);
                $em->flush();

                $token->setAuthenticated( false );
                return $this->redirect($this->generateUrl('home'));
            }
        }

        return [
            'form' => $form->createView()
        ];
    }

    /**
     * @param Request $request
     * @return array
     *
     * @Route("/camping/edit", name="camping_edit")
     * @Template()
     */
    public function editCampingAction(Request $request)
    {
        $token = $this->get( 'security.context' )->getToken();
        $currentUser = $token->getUser();

        $camping = $this->getDoctrine()
            ->getManager()
            ->getRepository('ResorCoreBundle:Camping')
            ->findOneBy(['owner' => $currentUser]);
        $form = $this->createForm('camping', $camping);

        if ('POST' == $request->getMethod()) {
            $form->handleRequest($request);
            $isValid = $form->isValid();

            if ($isValid){
                $em = $this->get('doctrine.orm.entity_manager');
                $em->persist($camping);
                $em->flush();

                return $this->redirect($this->generateUrl('home'));
            }
        }

        return [
            'form' => $form->createView()
        ];
    }
}
