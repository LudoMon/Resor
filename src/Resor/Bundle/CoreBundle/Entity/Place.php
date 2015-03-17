<?php

namespace Resor\Bundle\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Place
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Resor\Bundle\CoreBundle\Entity\PlaceRepository")
 */
class Place
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50)
     */
    private $name;

    /**
     * @var integer
     *
     * @ORM\Column(name="capacity", type="integer")
     */
    private $capacity;

    /**
     * @var PlaceCategory
     *
     * @ORM\ManyToOne(targetEntity="Resor\Bundle\CoreBundle\Entity\PlaceCategory")
     * @ORM\JoinColumn(nullable=false)
     */
    private $category;

    /**
     * @var Camping
     *
     * @ORM\ManyToOne(targetEntity="Resor\Bundle\CoreBundle\Entity\Camping")
     * @ORM\JoinColumn(nullable=false)
     */
    private $camping;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Place
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set capacity
     *
     * @param integer $capacity
     * @return Place
     */
    public function setCapacity($capacity)
    {
        $this->capacity = $capacity;

        return $this;
    }

    /**
     * Get capacity
     *
     * @return integer 
     */
    public function getCapacity()
    {
        return $this->capacity;
    }

    /**
     * Set category
     *
     * @param \Resor\Bundle\CoreBundle\Entity\PlaceCategory $category
     * @return Place
     */
    public function setCategory(\Resor\Bundle\CoreBundle\Entity\PlaceCategory $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return \Resor\Bundle\CoreBundle\Entity\PlaceCategory 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set camping
     *
     * @param \Resor\Bundle\CoreBundle\Entity\Camping $camping
     * @return Place
     */
    public function setCamping(\Resor\Bundle\CoreBundle\Entity\Camping $camping = null)
    {
        $this->camping = $camping;

        return $this;
    }

    /**
     * Get camping
     *
     * @return \Resor\Bundle\CoreBundle\Entity\Camping 
     */
    public function getCamping()
    {
        return $this->camping;
    }
}
