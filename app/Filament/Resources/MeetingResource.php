<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MeetingResource\Pages;
use App\Filament\Resources\MeetingResource\RelationManagers;
use App\Models\Meeting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MeetingResource extends Resource
{
    protected static ?string $model = Meeting::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('sprint_id')->relationship("sprint", "sprint_name")
                    ->required(),
                Forms\Components\Select::make('project_id')->relationship('project', 'project_name')
                    ->required(),
                Forms\Components\Textarea::make('summary')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('type')->options([
                    'sprint_planning' => 'Sprint Planning',
                    'daily_scrum' => 'Daily Scrum',
                    'sprint_review' => 'Sprint Review',
                    'sprint_retro' => 'Sprint Retro',
                ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sprint.sprint_name')
                    ->searchable()
                    ->sortable()
                    ->formatStateUsing(fn($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('project.project_name')
                    ->searchable()
                    ->sortable()
                    ->formatStateUsing(fn($state) => ucwords($state)),
                Tables\Columns\TextColumn::make('summary')
                    ->wrap()
                    ->lineClamp(2)
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->sortable()
                    ->formatStateUsing(function ($state) {
                        return match ($state) {
                            'sprint_planning' => 'Sprint Planning',
                            'daily_scrum' => 'Daily Scrum',
                            'sprint_review' => 'Sprint Review',
                            'sprint_retro' => 'Sprint Retro',
                            default => $state,
                        };
                    }),
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
            'index' => Pages\ListMeetings::route('/'),
            'create' => Pages\CreateMeeting::route('/create'),
            'view' => Pages\ViewMeeting::route('/{record}'),
            'edit' => Pages\EditMeeting::route('/{record}/edit'),
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
