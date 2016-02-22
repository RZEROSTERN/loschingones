<?php
/**
 * Created by PhpStorm.
 * User: RZEROSTERN
 * Date: 21/02/16
 * Time: 21:14
 */

namespace backend\models;


class UIDDesignDocument implements \Doctrine\CouchDB\View\DesignDocument
{
    public function getData()
    {
        return array(
            'language' => 'javascript',
            'views' => array(
                'by_uid' => array(
                    'map' => 'function(doc) {
                        if(\'document\' == doc.type) {
                            emit(doc.uid, doc._id, doc.ip, doc.ts, doc.tree);
                        }
                    }',
                    'reduce' => '_count'
                ),
            ),
        );
    }
}