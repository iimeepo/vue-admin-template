<?php
namespace app\api\controller;

use app\BaseController;
use Faker;

class User extends BaseController
{
    public function login()
    {
        $data = [
            'token' => 'admin-token'
        ];
        return $this->success($data);
    }

    public function info()
    {
        $data = [
            'roles' => [
                'admin'
            ],
            'introduction' => 'I am a super administrator',
            'avatar' => 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            'name' => 'Super Admin'
        ];
        return $this->success($data);
    }

    public function list()
    {
        $faker = Faker\Factory::create('zh_CN');
        $items = [];
        for ($i = 0; $i < 20; $i++) {
            $items[] = [
                'id' => $faker->numberBetween(1, 100),
                'username' => $faker->userName,
                'truename' => $faker->name,
                'type' => $faker->randomElement(['管理员', '编辑']),
                'email' => $faker->email,
                'role' => ['超级管理员'],
                'ip' => $faker->localIpv4,
                'status' => $faker->randomElement([0, 1]),
                'last_time' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
            ];
        }
        $data = [
            'total' => 100,
            'items' => $items,
        ];
        return $this->success($data);
    }

    public function logout()
    {
        return $this->success();
    }
}
