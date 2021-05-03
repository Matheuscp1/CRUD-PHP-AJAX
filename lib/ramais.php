<?php
include_once "Conexao-classe.php";

$ajax = file_get_contents("php://input");
$json = json_decode($ajax, true);
$conexao = new Conexao();

$ramal = new Ramais($json, $conexao);

//CHAMA AS FUNCOES
switch ($json['acao']) {
    case 'inserir':
        $ramal->salvarRamal();
        break;
    case 'consultar':
        $ramal->consultarRamais();
        break;
    case 'excluir':
        $ramal->deletarRamal();
        break;
    case 'editar':
        $ramal->atualizarRamal();
        break;
    default:
        echo 'Erro';
        break;
}

class Ramais{
    private Conexao $conexao;
    private $json;

    function __construct($json, $conexao){
        $this->json = $json;
        $this->conexao = $conexao;
    }


    // INSERI OS RAMAIS
    public function salvarRamal(){
        $link = $this->conexao->pegaLink();

        $nomeUser =   $this->json['nomeUser'];
        $numero =   $this->json['numero'];
        $ip =  $this->json['ip'];
        $status =  $this->json['status'];

        # INSERI APENAS SE O FORMULARIO FOR ENVIADO
        if (!empty($nomeUser) && !empty($numero) &&  !empty($ip) &&  !empty($status)) {
            $sql = "INSERT INTO ramais (RAMAL_NOME_USER, RAMAL_IP,RAMAL_STATUS,RAMAL_NUMERO) 
        VALUES ('" . $nomeUser . "','" . $ip . "', '" . $status . "', '" . $numero . "');";


            if (!mysqli_query($link, $sql)) {
                echo mysqli_error($link);
                exit;
            }
            echo  json_encode('Inserido');
        }
    }


    // DELETA OS RAMAIS
    public function deletarRamal(){
        $link = $this->conexao->pegaLink();


        $idEvento =  $this->json['idEvento'];

        $sql = "DELETE FROM ramais WHERE RAMAL_ID = $idEvento";

        if (!mysqli_query($link, $sql)) {
            echo mysqli_error($link);
            exit;
        }
        echo  json_encode('Deletado com sucesso');
    }


    //CONSULTA OS RAMAIS
    function consultarRamais(){
        $link = $this->conexao->pegaLink();
        $sql = "SELECT * FROM ramais";

        $result = mysqli_query($link, $sql);

        while ($row = $result->fetch_assoc()) {
            $array[] = [
                'nomeUser' => $row['RAMAL_NOME_USER'], 'ip' => $row['RAMAL_IP'],  'status' => $row['RAMAL_STATUS'],  'numero' => $row['RAMAL_NUMERO'],
                'id' => $row['RAMAL_ID']
            ];
        }

        $json = json_encode($array);

        echo $json;
    }

    //ATUALIZA OS RAMAIS
    function atualizarRamal(){
        $link = $this->conexao->pegaLink();
        
        $nomeUser =   $this->json['nomeUser'];
        $numero =   $this->json['numero'];
        $ip =  $this->json['ip'];
        $status =  $this->json['status'];
        $idUpdate =  $this->json['idUpdate'];
        
        $sql = "UPDATE ramais SET RAMAL_NOME_USER ='" . $nomeUser . "', RAMAL_IP = '" . $ip . "', RAMAL_STATUS = '" . $status . "', RAMAL_NUMERO = '" . $numero . "'
      WHERE RAMAL_ID  = '" . $idUpdate . "'";

        $result = mysqli_query($link, $sql);

        if (!mysqli_query($link, $sql)) {
            echo mysqli_error($link);
            exit;
        }
        echo  json_encode('Editado com sucesso');
    }
    
}
