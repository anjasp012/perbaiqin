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
        Schema::create('technician_specialists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('technician_id')->references('id')->on('technicians')->cascadeOnDelete();
            $table->foreignId('specialist_id')->references('id')->on('specialists')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technician_specialists');
    }
};
