<?php

namespace App\Filament\Resources\AttachmentsResource\Pages;

use App\Filament\Resources\AttachmentsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAttachments extends EditRecord
{
    protected static string $resource = AttachmentsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
