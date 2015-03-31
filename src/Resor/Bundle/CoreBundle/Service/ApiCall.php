<?php
/**
 * Created by PhpStorm.
 * User: LudoZeGeek
 * Date: 31/03/2015
 * Time: 21:38
 */

namespace Resor\Bundle\CoreBundle\Service;


class ApiCall {
    public function post($url, $data)
    {
        $jsonData = json_encode($data);

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($jsonData)
        ));

        $output = curl_exec($curl);
        curl_close($curl);
        return json_decode($output);
    }
}