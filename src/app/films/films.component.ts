import { Component, OnInit, ViewChild } from '@angular/core';
import { SwapiService } from '../core/services/swapi.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public filmList;
  public tableColumns = [
    'title',
    'episode_id',
    'director',
    'producer',
    'release_date',
  ];

  constructor(
    private swapiService: SwapiService,
  ) { }

  ngOnInit() {
    this.swapiService.getFilms()
      .subscribe(result => {
        this.filmList = new MatTableDataSource(result);
        this.filmList.sort = this.sort;

      });
  }

}
