<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Request;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use common\models\User;
use Firebase\JWT\JWT;

class UserController extends Controller
{
    private $tokenID;
    private $issuedAt;
    private $notBefore;
    private $expire;
    private $secretKey;
    private $algorithm;
    private $jwt;

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
		if($this->request->isPost) {
            $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
            $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

            if($username && $password){
                try {
                    $model = User::findByUsername($username);

                    if ($model->validatePassword($password)) {
                        $this->tokenID = base64_encode(mcrypt_create_iv(32));
                        $this->issuedAt = time();
                        $this->notBefore  = $this->issuedAt + 10;  //Adding 10 seconds
                        $this->expire     = $this->notBefore + 3600; // Adding 3600 seconds

                        $data = [
                            'iat' => $this->issuedAt,
                            'jti' => $this->tokenID,
                            'iss' => 'loschingones',
                            'nbf' => $this->notBefore,
                            'exp' => $this->expire,
                            'data' => [
                                'userId' => $model->getId(),
                                'userName' => $username,
                            ],
                        ];

                        header('Content-type: application/json');

                        $this->secretKey = openssl_random_pseudo_bytes(64);
                        $this->algorithm = 'HS256';

                        $this->jwt = JWT::encode($data, $this->secretKey, $this->algorithm);
                        $unencodedArray = ['jwt' => $this->jwt];

                        echo json_encode($unencodedArray);
                    } else {
                        header('HTTP/1.0 401 Unauthorized');
                        exit();
                    }
                } catch (Exception $e) {
                    header('HTTP/1.0 500 Internal Server Error');
                    exit();
                }
            } else {
                header('HTTP/1.0 400 Bad Request');
                exit();
            }
        } else {
            header('HTTP/1.0 405 Method Not Allowed');
            exit();
        }
	}
}
