<?php

namespace Resor\Bundle\CoreBundle\Form;
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserType extends AbstractType {

public function getName()
    {
        return 'owner';
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('firstname', 'text')
            ->add('lastname', 'text')
            ->add('username','text')
            ->add('password','text');
    }
}

