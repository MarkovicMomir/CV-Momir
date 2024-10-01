<?php
header('Content-Type: application/json');
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
if (isset($_POST['subscribed']))
    $subscribed = 1;
else $subscribed = 0;

$db = new mysqli('localhost', 'root', '', 'momir_db'); //Here, I specified the arguments that I used for testing on a local server (on 'Wampserver'). On the host server for http://momir.atwebpages.com, I put the arguments appropriate for that server. [Serbian: Ovde sam zadao argumente koje sam koristio za probni rad, na lokalnom serveru u racunaru (na 'Wampserveru'). Na 'host' serveru za http://momir.atwebpages.com sam stavio odgovarajuće argumente za taj server.]
if ($db->connect_errno) {
    echo json_encode([
        "msg" => "Failed to connect to the base!"
    ]);
    exit;
}
$stmt = $db->prepare('INSERT INTO users (username, password, email, created, subscribed) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)');
$stmt->bind_param('ssss', $username, $password, $email, $subscribed);
$query_is_successful = $stmt->execute();
if ($query_is_successful) {
    $data = [
        "success" => true,
        "msg" => "Successful registration!",
    ];
} else {
    $data = [
        "success" => false,
        "msg" => "Registration failed: " . $db->error,
    ];
}
$stmt->close();
echo json_encode($data);
$db->close();