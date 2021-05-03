<?php
// CLASSE PARA PEGAR A CONEXAO COM O BANCO DE DADOS
class Conexao
{
	private $link;
	//ALTERE AQUI AS CONFIGURACOES DO BANCO DE DADOS
	function __construct ($server = "localhost", $user = "root", $pass = "", $database = "call_center")
	{	
		$this->link = mysqli_connect($server, $user, $pass, $database);
		if(mysqli_connect_errno())
		{
			printf("Falha na conexão: \n", mysqli_connect_error());
			exit();
		}
	}
	
	function pegaLink (){
		return $this->link;
	}
	
	function fechar ()
	{
		mysqli_close($this->link);
	}
}


?>