<?php

namespace App\Filament\Resources\AttachmentsResource\Pages;

use App\Filament\Resources\AttachmentsResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewAttachments extends ViewRecord
{
    protected static string $resource = AttachmentsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
