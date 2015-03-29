<?php

namespace Resor\Bundle\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Offer
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Resor\Bundle\CoreBundle\Entity\OfferRepository")
 */
class Offer
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
     * @var integer
     *
     * @ORM\Column(name="campingId", type="integer")
     */
    private $campingId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="date")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="date")
     */
    private $updatedAt;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50)
     */
    private $name;

    /**
     * @var array
     *
     * @ORM\Column(name="options", type="array")
     */
    private $options;

    /**
     * @var array
     *
     * @ORM\Column(name="images", type="array")
     */
    private $images;

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
     * Set campingId
     *
     * @param integer $campingId
     * @return Offer
     */
    public function setCampingId($campingId)
    {
        $this->campingId = $campingId;

        return $this;
    }

    /**
     * Get campingId
     *
     * @return integer 
     */
    public function getCampingId()
    {
        return $this->campingId;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return Offer
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     * @return Offer
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Offer
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
     * Set options
     *
     * @param array $options
     * @return Offer
     */
    public function setOptions($options)
    {
        $this->options = $options;

        return $this;
    }

    /**
     * Get options
     *
     * @return array 
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * Set images
     *
     * @param array $images
     * @return Offer
     */
    public function setImages($images)
    {
        $this->images = $images;

        return $this;
    }

    /**
     * Get images
     *
     * @return array 
     */
    public function getImages()
    {
        return $this->images;
    }

    /**
     * Set camping
     *
     * @param \Resor\Bundle\CoreBundle\Entity\Camping $camping
     * @return Offer
     */
    public function setCamping(\Resor\Bundle\CoreBundle\Entity\Camping $camping)
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
