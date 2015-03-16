<?php

namespace Resor\Bundle\CoreBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AdminControllerTest extends WebTestCase
{
    public function testListcampings()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/admin/campings');
    }

}
