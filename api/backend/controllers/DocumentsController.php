<?php
/**
 * Created by PhpStorm.
 * User: RZEROSTERN
 * Date: 20/02/16
 * Time: 17:55
 */

namespace backend\controllers;

use Yii;
use linslin\yii2\curl\Curl;
use yii\web\Controller;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\web\Request;
use Doctrine\CouchDB\CouchDBClient;
use Firebase\JWT\JWT;

class DocumentsController extends Controller {
    private $tokenID;
    private $issuedAt;
    private $notBefore;
    private $expire;
    private $secretKey;
    private $algorithm;
    private $jwt;

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function behaviors() {
        return ArrayHelper::merge([
            [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Allow-Origin' => ['*'],
                    'Access-Control-Allow-Credentials' => true,
                    'Access-Control-Allow-Headers' => ['*'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE'],
                ],
            ],
        ], parent::behaviors());
    }

    public function beforeAction($action) {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

    /**
     * COUCHDB METHODS
     */
    public function actionNewDocument(){
        if($this->request->isPost) {
            $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);

            $client = CouchDBClient::create(array('dbname' => 'plantree'));

            $client->getDatabase();
            $result = $client->postDocument(array('ip' => $_SERVER['REMOTE_ADDR'], 'ts' => time()));

            $this->tokenID = base64_encode(mcrypt_create_iv(8));
            $this->issuedAt = time();
            $this->notBefore = $this->issuedAt + 10;  //Adding 10 seconds
            $this->expire = $this->notBefore + 2592000; // Adding 30 days

            $data = [
                'iat' => $this->issuedAt,
                'jti' => $this->tokenID,
                'iss' => 'loschingones',
                'nbf' => $this->notBefore,
                'exp' => $this->expire,
                'data' => [
                    'userId' => $id,
                    'couchuid' => $result[0],
                ],
            ];

            header('Content-type: application/json');

            $this->secretKey = 'JWT-CHINGON';
            $this->algorithm = 'HS256';

            $this->jwt = JWT::encode($data, $this->secretKey, $this->algorithm);

            $unencodedArray = [
                'jwt' => $this->jwt,
                'couchrev' => $result[1],
            ];

            echo json_encode($unencodedArray);
        } else {
            header("HTTP/1.0 405 Method not Allowed");
        }
    }

    public function actionSaveDataToDocument(){
        if($this->request->isPost){
            $auth = filter_input(INPUT_POST, 'auth', FILTER_SANITIZE_STRING);
            $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
            $rev = filter_input(INPUT_POST, 'rev', FILTER_SANITIZE_STRING);
            $data = filter_input(INPUT_POST, 'data');

            $decodedJWT = JWT::decode($auth, 'JWT-CHINGON', ['HS256']);

            if($decodedJWT->data->userId === $id) {
                $client = CouchDBClient::create(array('dbname' => 'plantree'));
                $client->getDatabase();
                $result = $client->putDocument(json_decode($data, true), $decodedJWT->data->couchuid, $rev);

                if($result) {
                    echo json_encode(['rev' => $result[1]]);
                }
            } else {
                header("HTTP/1.0 401 Unauthorized");
                exit();
            }
        } else {
            header("HTTP/1.0 405 Method not Allowed");
        }
    }

    public function actionGatherExistingDocument($id) {
        $client = CouchDBClient::create(array('dbname' => 'plantree'));

        $client->getDatabase();
        $doc = $client->findDocument($id);

        echo json_encode($doc->body);
    }

    /**
     * TEST METHODS
     */
    public function actionTestGetMethod() {
        $curl = new Curl();
        $response = $curl->get('http://example.com/');
    }
} 