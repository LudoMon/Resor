<?php

namespace Resor\Bundle\CoreBundle\Form;

/**
 * Description of CampingType
 *
 * @author Thibault
 */
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CampingType extends AbstractType {

    /**
     * Returns the name of this type.
     *
     * @return string The name of this type
     */
    public function getName()
    {
        return 'camping';
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', 'text', ['label' => 'Nom du camping :'])
            ->add('location', 'text', ['label' => 'Adresse: '])
            ->add('description', 'text', ['label' => 'Description: '])
            ->add('lat', 'hidden')
            ->add('lng', 'hidden')
            ->add('owner',new UserType(), ['label' => 'Informations sur le propriétaire'])
            ->add('picture');
    }

    public function setDefaultOptions(
        OptionsResolverInterface $resolver
    )
    {
        $resolver->setDefaults([
            'data_class' => 'Resor\Bundle\CoreBundle\Entity\Camping'
        ]);
    }
}
