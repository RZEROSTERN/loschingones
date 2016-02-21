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
        $curl = new Curl();
        $response = $curl->get('http://127.0.0.1:5984/albums');
        echo $response;
    }

    public function actionGatherExistingDocument() {

    }

    public function

    /**
     * TEST METHODS
     */
    public function actionTestGetMethod() {
        $curl = new Curl();
        $response = $curl->get('http://example.com/');
    }
} 