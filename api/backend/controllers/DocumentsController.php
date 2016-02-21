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

class DocumentsController extends Controller {
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
        $client = CouchDBClient::create(array('dbname' => 'plantree'));

        $client->getDatabase();
        $result = $client->postDocument(array('ip' => $_SERVER['REMOTE_ADDR'], 'ts' => time()));

        echo json_encode(array('id' => $result[0], 'rev' => $result[1]));
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