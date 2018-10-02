import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicsProvider } from '../../providers/musics/musics';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicPlayerPage } from "../music-player/music-player";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public allMusic = [];
    constructor(private socialSharing: SocialSharing, public actionSheetController: ActionSheetController, public loadingController: LoadingController, public navCtrl: NavController, public musicProvider: MusicsProvider) {
    }
    ionViewDidLoad() {
        let allMusicLoadingController = this.loadingController.create({
            content: "Getting Data From Server"
        });
        allMusicLoadingController.present();
        this.musicProvider.getMusic().subscribe((musicList) => {
            allMusicLoadingController.dismiss()
            this.allMusic = musicList;

        });
    }
    shareSong(music) {
        let shareSongActionSheet = this.actionSheetController.create({
            title: "Share Your Songs",
            buttons: [
                {
                    text: "Share on facebook",
                    icon: "logo-facebook",
                    handler: () => {
                        this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url)
                    }
                },
                {
                    text: "Share on Google",
                    icon: "logo-google"
                },
                {
                    text: "Share on Twitter",
                    icon: "logo-twitter",
                    handler: () => {
                        this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url)
                    }
                },
                {
                    text: "Share on Others",
                    icon: "share",
                    handler: () => {
                        this.socialSharing.share(music.name, '', music.image, music.music_url)
                    }
                },
                {
                    text: "Cancel",
                    role: "destructive"
                }
            ]
        });
        shareSongActionSheet.present();
    }
    gotomusic(music) {
        this.navCtrl.push(MusicPlayerPage, {
            music: music
        });
    }


}
