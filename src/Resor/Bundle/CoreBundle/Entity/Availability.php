<?php

namespace Resor\Bundle\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Availability
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Resor\Bundle\CoreBundle\Entity\AvailabilityRepository")
 */
class Availability
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
     * @var \DateTime
     *
     * @ORM\Column(name="startDate", type="date")
     */
    private $startDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="endDate", type="date")
     */
    private $endDate;

    /**
     * @var integer
     *
     * @ORM\Column(name="PlacesNumber", type="integer")
     */
    private $placesNumber;

    /**
     * @var integer
     *
     * @ORM\Column(name="price", type="integer")
     */
    private $price;

    /**
     * @var boolean
     *
     * @ORM\Column(name="isOpen", type="boolean")
     */
    private $isOpen;

    /**
     * @var Offer
     *
     * @ORM\ManyToOne(targetEntity="Resor\Bundle\CoreBundle\Entity\Offer", inversedBy="availabilities")
     * @ORM\JoinColumn(nullable=false)
     */
    private $offer;


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
     * Set startDate
     *
     * @param \DateTime $startDate
     * @return Availability
     */
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;

        return $this;
    }

    /**
     * Get startDate
     *
     * @return \DateTime 
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * Set endDate
     *
     * @param \DateTime $endDate
     * @return Availability
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * Get endDate
     *
     * @return \DateTime 
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * Set placesNumber
     *
     * @param integer $placesNumber
     * @return Availability
     */
    public function setPlacesNumber($placesNumber)
    {
        $this->placesNumber = $placesNumber;

        return $this;
    }

    /**
     * Get placesNumber
     *
     * @return integer 
     */
    public function getPlacesNumber()
    {
        return $this->placesNumber;
    }

    /**
     * Set price
     *
     * @param integer $price
     * @return Availability
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return integer 
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set isOpen
     *
     * @param boolean $isOpen
     * @return Availability
     */
    public function setIsOpen($isOpen)
    {
        $this->isOpen = $isOpen;

        return $this;
    }

    /**
     * Get isOpen
     *
     * @return boolean 
     */
    public function getIsOpen()
    {
        return $this->isOpen;
    }

    /**
     * Set offer
     *
     * @param \Resor\Bundle\CoreBundle\Entity\Offer $offer
     * @return Availability
     */
    public function setOffer(\Resor\Bundle\CoreBundle\Entity\Offer $offer)
    {
        $this->offer = $offer;

        return $this;
    }

    /**
     * Get offer
     *
     * @return \Resor\Bundle\CoreBundle\Entity\Offer 
     */
    public function getOffer()
    {
        return $this->offer;
    }
}
