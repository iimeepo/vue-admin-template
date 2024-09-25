<?php
namespace app\api\controller;

use app\BaseController;

class Index extends BaseController
{
    public function index()
    {
        return $this->success('欢迎使用vue-admin-template，欢迎给个star，https://gitee.com/iimeepo/vue-admin-template，谢谢！');
    }
}
