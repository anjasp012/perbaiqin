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
        Schema::create('consultation_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultation_id')->references('id')->on('consultations')->cascadeOnDelete();
            $table->string('invoice')->unique();
            $table->bigInteger('amount');
            $table->enum('status', ['unpaid', 'paid'])->default('unpaid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_payments');
    }
};
