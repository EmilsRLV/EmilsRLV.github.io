<?php
<script>
    function saveData(){
        
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
        
    }
</script>
?>
<body onload="startGame()" onclick="showCoords(event)" onkeypress="cancelMove(event)">
        <a id="a5" href="page1/index.php">Save Data</a>
        <?php
            if(){
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
            }
        ?>
        <!--p>Use the ACCELERATE button to stay in the air</p>
        <p>How long can you stay alive?</p-->
</body>
(function worker() {
  $.ajax({
    url: 'ajax/test.html', 
    success: function(data) {
      $('.result').html(data);
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(worker, 5000);
    }
  });
})();