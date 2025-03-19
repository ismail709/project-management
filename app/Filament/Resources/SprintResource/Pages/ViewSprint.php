<?php

namespace App\Filament\Resources\SprintResource\Pages;

use App\Filament\Resources\SprintResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewSprint extends ViewRecord
{
    protected static string $resource = SprintResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
