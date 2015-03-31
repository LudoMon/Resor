<?php

namespace Resor\Bundle\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Booking
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Resor\Bundle\CoreBundle\Entity\BookingRepository")
 */
class Booking
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
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="Resor\Bundle\CoreBundle\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @var Offer
     *
     * @ORM\ManyToOne(targetEntity="Resor\Bundle\CoreBundle\Entity\Offer")
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
     * @return Booking
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
     * @return Booking
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
     * Set user
     *
     * @param \Resor\Bundle\CoreBundle\Entity\User $user
     * @return Booking
     */
    public function setUser(\Resor\Bundle\CoreBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Resor\Bundle\CoreBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set offer
     *
     * @param \Resor\Bundle\CoreBundle\Entity\Offer $offer
     * @return Offer
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
