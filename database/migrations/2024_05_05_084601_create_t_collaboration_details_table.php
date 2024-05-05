<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('t_collaboration_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('t_collaboration_id')->references('id')->on('t_collaborations')->cascadeOnDelete();
            $table->foreignId('collaboration_id')->references('id')->on('collaborations')->cascadeOnDelete();
            $table->string('collaboration_name');
            $table->bigInteger('collaboration_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_collaboration_details');
    }
};
