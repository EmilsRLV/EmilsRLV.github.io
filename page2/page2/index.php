<!DOCTYPE html>
<html>

    <head>
        <title>My Page</title>
        <link href="assets/style.css" rel="stylesheet"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="scripts/script2.js"></script>
        <script src="scripts/enemy.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>

    <body onload="startGame()" onkeypress="accelerate(event)">
        <?php
            $con=new mysqli("localhost","root","","gamedata");
            if (mysqli_connect_errno())
            {
                echo "Failed to connect to MySQL: " . mysqli_connect_error();
            }
            $sql = "SELECT * FROM coordinates2";
            $result = $con->query($sql);

            /*$sql2 = "INSERT INTO coordinates2 (x, y)
            VALUES (200, 100)";

            if ($con->query($sql2) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql2 . "<br>" . $con->error;
            }*/


            
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $x=$row["x"];
                $y=$row["y"];
            }

            $con->close();
            
            echo "<script>function changeXY(){myGamePiece.x=".$x.";myGamePiece.y=".$y.";}</script>";
        ?>
        <script>
            function saveData(){
                <?php
                    $con=new mysqli("localhost","root","","gamedata");
                    if (mysqli_connect_errno())
                    {
                        echo "Failed to connect to MySQL: " . mysqli_connect_error();
                    }
                    $sql2 = "INSERT INTO coordinates2 (x, y)
                    VALUES (myGamePiece.x, myGamePiece.y)";

                    if ($con->query($sql2) === TRUE) {
                        echo "New record created successfully";
                    } else {
                        echo "Error: " . $sql2 . "<br>" . $con->error;
                    }
                    $con->close();
                ?>
            }
        </script>
        <button onmousedown="accelerate(0)" >UP</button>
        <button onmousedown="accelerate(1)" >RIGHT</button>
        <button onmousedown="accelerate(2)" >DOWN</button>
        <button onmousedown="accelerate(3)" >LEFT</button>
        <button onmousedown="accelerate(4)" >STOP</button>
        <!--p>Use the ACCELERATE button to stay in the air</p>
        <p>How long can you stay alive?</p-->
    </body>

</html>
