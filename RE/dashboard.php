<!DOCTYPE HTML>

<html>
	<head>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="css/dashboard.css">
		<title> Dashboard</title>
	</head>
	<body>
		<div id="head">
		</div><!--head-->
		<div id="left_nav" class="col-md-2">
			<div class="input-group">
				<span class="input-group-addon" id="search">Go</span>
				<input type="text" id="search_field" class="form-control" placeholder="Suche...">
			</div><!--input-group-->
			<ul class="nav nav-pills nav-stacked">
				<li role="presentation" class="active navlist"><a href="#">Home</a></li>
				<li class="navlist "role="presentation"><a href="#">Anforderung erstellen</a></li>
				<li class="navlist" role="presentation"><a href="#">Profil</a></li>
			</ul>
		</div><!--left_nav-->
		<div id="content-wrapper" class="panel col-md-10">
			<h2>Anforderungen</h2>
			<hr>
				<div id="content" class="panel panel-body">
					<label class="req-label">Das System muss dem Nutzer die Möglichkeit bieten, sich einloggen zu können.</label>
					  <label class="req-btn">
						<button type="button" class="btn btn-default" aria-label="Left Align">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
						</button>
						<button type="button" class="btn btn-default" aria-label="Left Align">
							<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
						</button>
					  </label>
				</div><!--content-->
			<hr>
		</div><!--content-wrapper-->
		<div id="footer">
		<p id="copyright">This project was created as open source application. Feel free to use it.</p>
		</div><!--footer-->
	</body>
</html>