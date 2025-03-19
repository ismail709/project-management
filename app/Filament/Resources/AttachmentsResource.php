<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AttachmentsResource\Pages;
use App\Filament\Resources\AttachmentsResource\RelationManagers;
use App\Models\Attachments;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AttachmentsResource extends Resource
{
    protected static ?string $model = Attachments::class;

    protected static ?string $navigationIcon = 'heroicon-o-paper-clip';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('task_id')->relationship('task','task_title')
                    ->required(),
                Forms\Components\FileUpload::make('attachment_path')
                    ->required(),
                Forms\Components\Select::make('uploaded_by')->relationship('uploadedBy','name')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('task.task_title')
                    ->sortable()
                    ->searchable()
                    ->formatStateUsing(fn ($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('attachment_path')
                    ->searchable(),
                Tables\Columns\TextColumn::make('uploadedBy.name')
                    ->sortable()
                    ->searchable()
                    ->formatStateUsing(fn ($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAttachments::route('/'),
            'create' => Pages\CreateAttachments::route('/create'),
            'view' => Pages\ViewAttachments::route('/{record}'),
            'edit' => Pages\EditAttachments::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
