<?php

ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

require_once('db.php');

$query = "SELECT `Value` FROM `Bids` ORDER BY Value DESC";

$result = $conn->query($query);
$result = $result->fetch_assoc();
echo json_encode($result);

