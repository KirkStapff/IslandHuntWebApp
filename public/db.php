<?php

$host = '213.171.200.102';
$dbname = 'BosomBuddiesAuctions';
$user = 'kirk.stapff';
$pass = 'Tittymilk12';

try{
    $conn = new mysqli($host, $user, $pass, $dbname);
}catch(PDOException $e){
    $error = $e->getMessage();
    echo $error;
}