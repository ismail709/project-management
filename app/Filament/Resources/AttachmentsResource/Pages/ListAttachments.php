<?php

namespace App\Filament\Resources\AttachmentsResource\Pages;

use App\Filament\Resources\AttachmentsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAttachments extends ListRecords
{
    protected static string $resource = AttachmentsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
