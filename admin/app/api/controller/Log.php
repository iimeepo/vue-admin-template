<?php
namespace app\api\controller;

use app\BaseController;
use Faker;

class Log extends BaseController
{
    public function list()
    {
        $faker = Faker\Factory::create('zh_CN');
        $items = [];
        for ($i = 0; $i < 20; $i++) {
            $items[] = [
                'id' => $faker->numberBetween(1, 100),
                'title' => $faker->title,
                'level' => $faker->randomElement(['DEBUG', 'INFO', 'WARNING', 'ERROR']),
                'method' => $faker->randomElement(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
                'time' => date('Y-m-d H:i:s'),
                'author' => $faker->name,
                'created_at' => date('Y-m-d H:i:s'),
                'ip' => $faker->localIpv4,
            ];
        }
        $data = [
            'total' => 100,
            'items' => $items
        ];
        return $this->success($data);
    }
}
