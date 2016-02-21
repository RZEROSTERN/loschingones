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

    public function actionIndex() {
        //Init curl
        $curl = new Curl();

        //get http://example.com/
        $response = $curl->get('http://example.com/');
    }
} 