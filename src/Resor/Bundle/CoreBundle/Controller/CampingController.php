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

        $isValid = "NaN";
        $camping = new Camping();
        $form = $this->createForm('camping', $camping);

        if ('POST' == $request->getMethod()) {
            
            $form->handleRequest($request);
            $isValid = $form->isValid() ;
            if( $isValid){
                 
                $em = $this->get('doctrine.orm.entity_manager');
                $em->persist($camping);
                $em->flush();
                
            }
        }

        return [
            'isValid' => $isValid,
            'form' => $form->createView()
        ];
        
    }
}
