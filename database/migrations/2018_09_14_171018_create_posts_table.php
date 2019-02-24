<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title', 191);
            $table->longText('body')->nullable(true);
            $table->char('visibility', 10);
            $table->char('pin', 10)->nullable(true);
            
            $table->uuid('user_id')->nullable(true);

            $table->date('remind_date')->nullable(true);
            $table->date('remind_date_end')->nullable(true);
            $table->time('remind_time')->nullable(true);
            $table->time('remind_time_end')->nullable(true);
            $table->dateTime('remind_datetime')->nullable(true);
            $table->dateTime('remind_datetime_end')->nullable(true);
            
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
