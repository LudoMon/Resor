<?php

namespace Resor\Bundle\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Camping
 *
 * @ORM\Table(name="camping")
 * @ORM\Entity(repositoryClass="Resor\Bundle\CoreBundle\Entity\CampingRepository")
 */
class Camping
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
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255)
     */
    private $url;

    /**
    +     * @var boolean
    +     *
    +     * @ORM\Column(type="boolean")
    +     */
    private $isUrlChecked;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    private $isActive;


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
     * @return Camping
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
     * Set url
     *
     * @param string $url
     * @return Camping
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set isUrlChecked
     *
     * @param boolean $isUrlChecked
     * @return Camping
     */
    public function setIsUrlChecked($isUrlChecked)
    {
        $this->isUrlChecked = $isUrlChecked;

        return $this;
    }

    /**
     * Get isUrlChecked
     *
     * @return boolean 
     */
    public function getIsUrlChecked()
    {
        return $this->isUrlChecked;
    }

    /**
     * Set isActive
     *
     * @param boolean $isActive
     * @return Camping
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive
     *
     * @return boolean 
     */
    public function getIsActive()
    {
        return $this->isActive;
    }
}
