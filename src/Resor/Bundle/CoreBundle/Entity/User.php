<?php

namespace Resor\Bundle\CoreBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="user")
 * @ORM\Entity
 */
class User extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
    +     * @var string
    +     *
    +     * @ORM\Column(type="string", length=50)
    +     */
    protected $firstName;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=50)
     */
    protected $lastName;

    /**
     * @var Camping
     *
     * @ORM\OneToOne(targetEntity="Resor\Bundle\CoreBundle\Entity\Camping", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    protected $camping;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }

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
     * Set firstName
     *
     * @param string $firstName
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string 
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string 
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set camping
     *
     * @param \Resor\Bundle\CoreBundle\Entity\Camping $camping
     * @return User
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
