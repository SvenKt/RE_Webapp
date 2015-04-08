<?php
require 'db_conf.php';

	//connect to DB
	establishDBConnection();
		
		$getUsers = "select username, id, team_id, email from users";
		$allUsers = mysql_query($getUsers) or die (mysql_error());
		
		while ($row = mysql_fetch_object($allUsers)){
			$users[] = array($row->id, $row->username,$row->email,$row->team_id);
		}
		
		echo json_encode($users);

			
		
?>