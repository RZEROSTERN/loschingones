<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;

class UserController extends Controller
{
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

	public function actionIndex() {
		header('HTTP/1.0 403 Forbidden');
		exit();
	}

	public function actionLogin() {
		
	}
}
